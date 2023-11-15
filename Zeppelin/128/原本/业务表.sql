CREATE TABLE PROBE.DSSP_REMOTE_CONTROL_LOGIN (
  REMOTE_CONTROL_LOGIN_ID VARCHAR NOT NULL,
  RECORD_TIME BIGINT,
  OTHER_ID BIGINT,
  FROM_IP VARCHAR,
  FROM_PORT INTEGER,
  FROM_MAC VARCHAR,
  TARGET_IP VARCHAR,
  TARGET_PORT INTEGER,
  TARGET_MAC VARCHAR,
  LOGIN_TIME BIGINT,
  LOGOUT_TIME BIGINT,
  CONNECTION_TIME BIGINT,
  LOGIN_FLAG VARCHAR,
  LOGIN_USER VARCHAR,
  KERNEL VARCHAR,
  CLIENT_OS VARCHAR,
  STATUS INTEGER,
  SESSION_ID BIGINT,
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