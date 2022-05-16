DESCRIBE Country;
DESCRIBE OrderType;
DESCRIBE Task;

SELECT * FROM Task;

/* Statistics by oder_type */
SELECT COUNT(*) AS 'total', COUNT(pu_signed_at) AS 'signed', order_type, MAX(pu_planned_time) AS 'last_planned_pickup' FROM task GROUP BY order_type;
