<?php
namespace Mondaycom\Code;


class Quickstart
{
    private $secureStorage;
    private $envVariables;
    private $queue;

    public function __construct() {
        $this->secureStorage = new \OpenAPI\Client\Api\SecureStorageApi();
        $this->envVariables = new \OpenAPI\Client\Api\SecretApi();
        $this->queue = new \OpenAPI\Client\Api\QueueApi();
    }

    public function demoSecureStorage($key = "foo", $value = "bar") {
        $secure_storage_data_contract = new \OpenAPI\Client\Model\StorageDataContract();
        $secure_storage_data_contract->setValue($value);
        try {
            $this->secureStorage->putSecureStorage($key, $secure_storage_data_contract);
        } catch (\Throwable $e) {
            echo 'Exception when calling SecureStorageApi->putSecureStorage: ', $e->getMessage(), PHP_EOL;
        }
        
        try {
            $result = $this->secureStorage->getSecureStorage($key);
            return $result->getValue();
        } catch (\Throwable $e) {
            echo 'Exception when calling SecureStorageApi->getSecureStorage: ', $e->getMessage(), PHP_EOL;
        }
    }

    public function demoEnvVariablesGet($key = "key") {
        try {
            $result = $this->envVariables->getSecret($key);
            return $result;
        } catch (\Throwable $e) {
            echo 'Exception when calling SecretApi->getSecret: ', $e->getMessage(), PHP_EOL;
        }
    }

    public function demoPublishMessage($message) {
        // $publish_message_params = new \OpenAPI\Client\Model\PublishMessageParams($message);
        try {
            $this->queue->publishMessage($message);
        } catch (\Throwable $e) {
            echo 'Exception when calling QueueApi->publishMessage: ', $e->getMessage(), PHP_EOL;
        }
    }
}
