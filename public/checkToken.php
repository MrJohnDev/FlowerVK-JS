<?
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

function isSecure()
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || $_SERVER['SERVER_PORT'] == 443;
}

$data = file_get_contents("php://input");
$data = json_decode($data ?? "{ platform: null }");

if (!isSecure()) return print json_encode(["error" => ["error_description" => "only HTTPS connections supported"]]);
if (!isset($data->token)) return print json_encode(["error" => ["error_description" => "one or more params is not set"]] + (!empty($data) ? ["data" => $data] : []));
if (!isset($data->platform) or empty($data->platform) or !in_array($data->platform, ['ANDROID', 'IPHONE', 'DESKTOP'])) $data->platform = "DESKTOP";


$app = [

    "ANDROID" => [
        'ID' => 2274003,
        'SECRET' => 'hHbZxrka2uZ6jB1inYsH',
        'AGENT' => 'VKAndroidApp/5.51.1-4499 (Android 6.0.1; SDK 19; armeabi-v7a; Nexus 7; ru)'
    ],
    "IPHONE" => [
        'ID' => 3140623,
        'SECRET' => 'VeWdmVclDCtn6ihuP1nt',
        'AGENT' => 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'
    ],
    "DESKTOP" => [
        'ID' => 5027722,
        'SECRET' => 'Skg1Tn1r2qEbbZIAJMx3',
        'AGENT' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    ],

][$data->platform];


function getCurl(String $url, String $agent = null): String
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    if (isset($agent)) curl_setopt($ch, CURLOPT_USERAGENT, $agent);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_REFERER, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
}


$authUrl = "https://oauth.vk.com/token?";

$pars['grant_type'] = "client_credentials";
$pars['client_id'] = $app['ID'];
$pars['client_secret'] = $app['SECRET'];
$pars['v'] = 5.103;
$query = http_build_query($pars);
$url = $authUrl . $query;

$result = getCurl($url, $app['AGENT']);
$obj = json_decode($result);

if (isset($obj->error)) print $result;
else {

    print getCurl("https://api.vk.com/method/secure.checkToken?" . http_build_query([
        "v" => 5.103,
        "client_secret" => $app['SECRET'],
        "token" => $data->token,
        "access_token" => $obj->access_token
    ]));
}
