## Sync files to Cloud Storage

### Install
```npm install -g cloudsync```

### Usage
```bash
$ cloudsync <config json file>
$
$ Options:
$
$   -f, --force-upload      Upload all files
$   -i, --incremental-mode  Only upload new/changed file
```

_**NOTE**_: Currently only support Aliyun(OSS) and AWS(S3) at this time.

### Configuration file
create the ```.clondsync.json``` file in your current working directory.

```json
{
  "aliyun-oss": {
    "source": "target-files-path",
    "dest": "cloud-storage-path",
    "accessKeyId": "aliyun-oss-key-id",
    "secretAccessKey": "aliyun-oss-access-key",
    "endpoint": "http://oss-cn-beijing.aliyuncs.com",
    "bucket": "bucket-name"
  },
  "aws-s3": {
    "source": "target-files-path",
    "dest": "cloud-storage-path",
    "accessKeyId": "aws-s3-key-id",
    "secretAccessKey": "aws-s3-access-key",
    "region": "us-west-2",
    "bucket": "bucket-name"
  }
}
```
