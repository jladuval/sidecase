function SidecaseCtrl($scope, $timeout){
    $.get('/getprojects')
    .done(function(data){
        $scope.projects = data;
        console.log(data);
    });
  $scope.projects = [
    {name: 'project1'},
    {name: 'project2'}
  ];
  $timeout(function(){
    $scope.projects.push({name: 'project3'});}, 3000);
}
