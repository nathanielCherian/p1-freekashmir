cd homepage
yarn build
cd ..
rm -r demo/src/main/resources/static && cp -R homepage/build demo/src/main/resources/static
