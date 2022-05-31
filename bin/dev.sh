#!/bin/sh
path=$(cd "$(dirname "$0")"; pwd)
root_path=$(cd "$(dirname "$0")"; cd ..; pwd)

cd "$root_path/server" && ./vendor/bin/sail up &
P1=$!
cd "$root_path/client" && npm run dev &
P2=$!
wait $P1 $P2