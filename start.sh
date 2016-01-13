for pid in $(ps -ef|grep nodejs-mysql | grep -v grep | awk '{print $2}' ); do
        echo $pid
        kill -9 $pid
done

nohup /usr/local/bin/node ./bin/www &