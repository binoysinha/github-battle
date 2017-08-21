#Step 1.
FROM node:6.11-wheezy

#Step 2
LABEL version="1.0"
LABEL description="This is Test Docker Image"
LABEL maintainer "Binoy Sinha <binay.sinha53@gmail.com>"

#Step 3.
RUN mkdir -p /usr/src/appName
WORKDIR /usr/src/appName

#Step 4.
COPY ["package.json", "npm-shrinkwrap.json*", "./"]

#Step 5.
ENV NODE_ENV production

#Step 6..
RUN yarn global add forever #At least for now ;)

#Step 7
RUN cd /usr/src/appName && yarn


#Step 8
COPY . .

#Step 9.
EXPOSE 1337

#Step 10.
ADD confile.sh /usr/src/AppName/
RUN ["chmod", "+x", "/usr/src/AppName/confile.sh"]