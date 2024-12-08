const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require("../constants");

const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

exports.generatePresignedUrl = async (req, res) => {
  const { fileName, fileType } = req.query;
  console.log(`received, filename=${fileName}, type=${fileType}`);
  if (!fileName) {
    return res.status(400).json({ error: "Missing filename!" });
  }
  if (!fileType) {
    return res.status(400).json({ error: "Incorrect file type!" });
  }

  const params = {
    Bucket: "mit-marketplace",
    Key: fileName,
    ContentType: fileType,
  };
  try {
    const url = await getSignedUrl(s3Client, new PutObjectCommand(params), {
      expiresIn: 120,
    });
    console.log("url generated: ", url);
    res.status(200).json({ url: url });
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    res.status(500).json({ error: "Could not generate presigned URL, error" });
  }
};
