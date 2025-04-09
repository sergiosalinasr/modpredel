param (
    [Parameter(Mandatory = $true)]
    [string]$Command
)

docker exec -it liquibase liquibase $Command

