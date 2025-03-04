npm run build && \
tar -cz -C dist/spa -f dist/web.tar . && \
ssh dev rm -f /root/app/7wd.io/web.tar && \
ssh dev rm -fr /root/app/7wd.io/web && \
ssh dev mkdir /root/app/7wd.io/web && \
scp dist/web.tar ds:/root/app/7wd.io && \
ssh dev tar -xvf /root/app/7wd.io/web.tar -C /root/app/7wd.io/web
