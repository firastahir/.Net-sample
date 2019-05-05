pipeline {
  agent {
    kubernetes {
      label 'mypod'
      defaultContainer 'jnlp'
      yaml """
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
  - name: docker
    image: docker
    command: ['cat']
    tty: true
  - name: mongo
    image: mongo
  - name: golang
    image: golang:1.10
    command:
    - cat
    tty: true
  - name: busybox
    image: busybox
    command:
    - cat
    tty: true
  - name: dind
    image: docker:stable-dind
    securityContext:
      privileged: true
    volumeMounts:
      - name: dind-storage
        mountPath: /var/lib/docker
  volumes:
      - name: dind-storage
        emptyDir: {}
"""
    }
  }
  
  stages {
    stage('Run maven') {
      steps {
        container('maven') {
          sh 'mvn -version'
        }
        container('busybox') {
          sh '/bin/busybox'
        }
      }
    }    
         stage('Go version') {
           steps {      
            container('golang') {
               sh """
                 go version
                 """
             }      
           }
          }
        
         stage('Mongo') {
            steps {
                container('mongo') {
                    sh 'mongod --version'
                   
                }
             }
        }
         stage('Docker build') {
            steps {
                container('dind') {
                    sh 'docker build -t myimage:v1 .'
                   
                }
             }
        }
  }
}
