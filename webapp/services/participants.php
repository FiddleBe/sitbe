<?php


    $actual_link = $_SERVER['REQUEST_URI'];
    $url = "https://sitregparticipantlist-a5a504e08.dispatcher.hana.ondemand.com/destinations/HANAMDC/com/sap/sapmentors/sitreg/odatapublic/service.xsodata";
    $url = str_replace("/services/participants.php", $url, $actual_link);

    switch (getMethod()) {
        case 'POST':
            $response = makePostRequest(getPostData(), $url);
            break;
        case 'PUT':
            $response = makePutRequest(getPutOrDeleteData($url), $url);
            break;
        case 'DELETE':
            $response = makeDeleteRequest($url);
            break;
        case 'GET':
            $response = makeGetRequest($url);
            break;
        default:
            echo "This proxy only supports POST, PUT, DELETE AND GET REQUESTS.";
            return;
    }

    echo $response;

    function getMethod() {
        return $_SERVER["REQUEST_METHOD"]; 
    }

    function getPostData() {
        return http_build_query($_POST);
    }

    function getPutOrDeleteData($url) {
        $data = substr(file_get_contents('php://input'), strlen($url));
        return $data;
    }

    function makePostRequest($data, $url) {
        $httpHeader = array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data));
        
        return makePutOrPostCurl('POST', $data, true, $httpHeader, $url);
    }

    function makePutRequest($data, $url) {
        return makePutOrPostCurl('PUT', $data, true, $httpHeader, $url);
    }

    function makeDeleteRequest($url) {
        $ch = initCurl($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

    function makeGetRequest($url) {
        $ch = initCurl($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

    function makePutOrPostCurl($type, $data, $returnTransfer, $httpHeader, $url) {
        $ch = initCurl($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $type);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, $returnTransfer);
        
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

    function initCurl($url) {
        $httpHeader = array( 'Content-Type: application/x-www-form-urlencoded'); //use requested headers for proxy

        //use the requested type as response type
        foreach (getallheaders() as $name => $value) { 
            if($name == "Accept"){
                header("Content-Type:".$value);
            }
            //array_push( $httpHeader, $name.":".$value) ;
        }         

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $httpHeader);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36');
        return $ch;
    }
?>