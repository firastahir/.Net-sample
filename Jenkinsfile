node {
    podTemplate(){
    node('mangy-eel-jenkins-slave') {
         container('dind')
     {
     
    // stage('Install custom softwares') {
     
   //  sh "apk add jq && jq --version"
   //  sh "pwd"
    // sh "apk add curl"
    // sh "curl --version"
    // sh "apk add py-pip"
     
    // }
     
     stage('Git Checkout') {
     
     checkout scm
     
     }
     
     stage('Build Docker Image') {
     
     sh "docker build -t dot-net-core:latest ."
     
     }
     
  }
 }
}
}
