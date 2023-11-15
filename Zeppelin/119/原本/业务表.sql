CREATE TABLE PROBE.DSSP_MAIL_SEND (
  MAIL_SEND_ID VARCHAR NOT NULL,
  RECORD_TIME BIGINT,
  OTHER_ID BIGINT,
  FROM_IP VARCHAR,
  FROM_MAC VARCHAR,
  FROM_PORT INTEGER,
  TARGET_IP VARCHAR,
  TARGET_MAC VARCHAR,
  TARGET_PORT INTEGER,
  FROM_USER VARCHAR,
  TO_USER VARCHAR,
  CC_USER VARCHAR,
  BCC_USER VARCHAR,
  FROM_DOMAIN VARCHAR,
  TO_DOMAIN VARCHAR,
  CC_DOMAIN VARCHAR,
  BCC_DOMAIN VARCHAR,
  ISO_TYPE VARCHAR,
  CERTIFY_CATEGORY INTEGER,
  MAIL_TOTAL_SIZE INTEGER,
  MAIL_SUBJECT VARCHAR,
  CONTENT_DETAILS VARCHAR,
  ATTACHMENT_COUNT INTEGER,
  ATTACHMENT_TOTAL_SIZE INTEGER,
  ATTACHMENT_DETAILS VARCHAR,
  SMTP_ID BIGINT,
  SENDDATE BIGINT,
  REQ_TOTAL_COUNTS INTEGER,
  RES_TOTAL_COUNTS INTEGER,
  REQ_BYTES INTEGER,
  RSP_BYTES INTEGER,
  REQ_PACKETS INTEGER,
  RSP_PACKET INTEGER,
  RETRANS_REQKTS INTEGER,
  RETRANS_REQBYTES INTEGER,
  RETRANS_PSPPKTS INTEGER,
  RETRANS_PSPBYTES INTEGER,
  REQ_TIME BIGINT,
  RSP_TIME BIGINT,
  APM_FLAG VARCHAR,
  SOURCE_TYPE VARCHAR,
  FROM_REGION_ID VARCHAR,
  TARGET_REGION_ID VARCHAR,
  DATA_LEVEL VARCHAR,
  CLASS_CODE_INDUSTRY VARCHAR,
  CLASS_CODE_SUBJECT VARCHAR,
  CLASS_CODE_AREA VARCHAR,
  SENSITIVE_FLAG VARCHAR,
  DATA_ELEMENT_CODE VARCHAR
);