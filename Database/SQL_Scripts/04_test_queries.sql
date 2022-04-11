DESCRIBE Task;

SELECT * FROM Task;

/* This is for checking if the pu_signed_at is changed or not 
when the task is updated.
In real life, it could be when the customer signs, 
the datetime is updated automatically
*/
UPDATE Task
SET pu_signature_image = 'iVBORw0KGgoAAAANSUhEUgAABPAAAAK8CAYAAABhiUEuAAAAAXNSR0IArs4c6QAAIABJREFUeF7s3QnQNVtZH/p/bqwb9YqIigMgCIIaiB4ZIhrUI6VgIMhgAlGjAmLgqiEMGjSpugXn3kRFkXNwIIEbc8CJBMrAAQMORCQRlQQ8nqugTBJEcMCIQFTMUNx6oBv7bPY8ru7+raqv3u/73u7Vz/qtfve799Nr' 
WHERE uuid = 'otttazldobll59mrjmrrjzck';