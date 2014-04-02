function SidecaseCtrl($scope, $timeout){
  $scope.projects = [
    {name: 'project1'},
    {name: 'project2'}
  ];
  $timeout(function(){
    $scope.projects.push({name: 'project3'});}, 3000);
}
