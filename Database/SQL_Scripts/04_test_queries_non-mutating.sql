DESCRIBE Country;
DESCRIBE OrderType;
DESCRIBE Task;
DESCRIBE User;

SELECT * FROM Task;

/* Statistics by order_type */
SELECT COUNT(*) AS 'total', COUNT(pu_signed_at) AS 'signed', order_type, MAX(pu_planned_time) AS 'last_planned_pickup' FROM Task GROUP BY order_type;
