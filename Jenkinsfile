def label = "mypod-${UUID.randomUUID().toString()}"

podTemplate(label: label, yaml: """
apiVersion: v1
kind: Pod
metadata:
  labels:
    some-label: some-label-value
spec:
  containers:
  - name: maven
    image: maven:3.3.9-jdk-8-alpine
    command: ['cat']
    tty: true
  - name: mongo
    image: mongo
  - name: golang
    image: golang:1.10
    command:
    - cat
    tty: true
"""
  ) {

    node(label) {

         stage('SCM') {
               checkout scm       
               }
        
         stage('Go version') {
      
            container('golang') {
               sh """
                 go version
                 """
             }      
           }
        stage('Maven') {
            
                container('maven') {
                    sh 'mvn --version'
                   
                }
            
        }
         stage('Mongo') {
            
                container('mongo') {
                    sh 'mongod --version'
                   
                }
             
        }
    }
}
