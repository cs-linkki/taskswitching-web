taskswitching-web
=================

- detect and record all key presses (block other keys)
- if quit midway, store scores nevertheless
    (only when attempting to logout; this is to avoid additional burden for computer)

export LUKIOT_JDBC_URL=jdbc:mysql://localhost:3306/lukiot
export LUKIOT_JDBC_USERNAME=lukiot
export LUKIOT_JDBC_PASSWORD=lukiot
java -jar target/dependency/jetty-runner.jar target/*.war
