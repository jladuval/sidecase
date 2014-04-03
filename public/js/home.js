function SidecaseCtrl($scope, $http){
    $http.get('/getprojects')
    .success(function(data){
        $scope.projects = data;
        for(var i = 0; i < $scope.projects.length; i++){
            $scope.getCollaborators($scope.projects[i]);
        }
    });

    $scope.getCollaborators = function(project){
        $http.get('/collaborators?name='+project.name+'&owner='+project.owner)
        .success(function(data){
            for (var i in data){
                project.collaborators.push(data[i]);
            }
            $scope.$apply();
        });
    }
}
