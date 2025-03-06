npm run build && \
tar -cz -C dist/spa -f dist/web.tar . && \
ssh dev rm -f /root/app/7wd/web.tar && \
ssh dev rm -fr /var/www/html/7wd && \
ssh dev mkdir /var/www/html/7wd && \
scp dist/web.tar dev:/root/app/7wd && \
ssh dev tar -xvf /root/app/7wd/web.tar -C /var/www/html/7wd
