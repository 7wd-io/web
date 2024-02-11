npm run build && \
tar -cz -C dist/spa -f dist/web.tar . && \
ssh ds rm -f /root/projects/7wd.io/web.tar && \
ssh ds rm -fr /root/projects/7wd.io/web && \
ssh ds mkdir /root/projects/7wd.io/web && \
scp dist/web.tar ds:/root/projects/7wd.io && \
ssh ds tar -xvf /root/projects/7wd.io/web.tar -C /root/projects/7wd.io/web
