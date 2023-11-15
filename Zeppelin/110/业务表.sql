CREATE TABLE PROBE.DSSP_DATA_BASE_EXEC (
  DATA_BASE_EXEC_ID VARCHAR NOT NULL,
  RECORD_TIME BIGINT,
  OTHER_ID VARCHAR,
  CLIENT_IP VARCHAR,
  CLIENT_PORT INTEGER,
  CLIENT_MAC VARCHAR,
  FROM_IP VARCHAR,
  FROM_PORT INTEGER,
  FROM_MAC VARCHAR,
  TARGET_IP VARCHAR,
  TARGET_PORT INTEGER,
  TARGET_MAC VARCHAR,
  APPLICATION_ACCOUNT VARCHAR,
  DATA_BASE_ACCOUNT VARCHAR,
  DATA_BASE_TYPE VARCHAR,
  DATA_BASE_VERSION VARCHAR,
  DATA_BASE_NAME VARCHAR,
  TABLE_NAME VARCHAR,
  "INSTANCE" VARCHAR,
  SQL_TYPE VARCHAR,
  START_EXEC_TIME BIGINT,
  EXEC_TIME INTEGER,
  AFFECT_ROWS INTEGER,
  EXEC_RESULT INTEGER,
  FAIL_CODE INTEGER,
  FAIL_INFO VARCHAR,
  "SQL" VARCHAR,
  SESSION_ID VARCHAR,
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
  DATA_ELEMENT_CODE VARCHAR,
  SYSTEM_CODE VARCHAR,
  WARNING_COUNT INTEGER,
  SEARCH_RESULT VARCHAR,
  SW_CODE VARCHAR,
  IS_MATCH VARCHAR,
  IS_MATCH_TYPE VARCHAR
);