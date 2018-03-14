import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import RepoList from './github/RepoList.jsx';
import SearchBar from './github/SearchBar.jsx';
import * as consts from '../../config.js';

class App extends Component{
  constructor(props){
    super(props);
    this.state={userName:'vivek7890',userData:[],userRepos:[],perPage:10};
  }
  // Get user data from github
  getUserData(){
    $.ajax({
      url:'https://api.github.com/users/'+this.state.userName+'?client_id='+this.props.clientId+'&client_secrect='+this.props.clientSecret,
      dataType:'json',
      cache:'false',
      method:'get',
      success:function(data){
        this.setState({userData:data});
      }.bind(this),
      error:function(xhr,status,err){
        this.setState({userName:null});
        alert(err);
      }.bind(this)
    });
  }
  // Get User Repos
  getUserRepos(){
    $.ajax({
      url:'https://api.github.com/users/'+this.state.userName+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secrect='+this.props.clientSecret+'&sort=created',
      dataType:'json',
      cache:'false',
      method:'get',
      success:function(data){
        this.setState({userRepos:data});
      }.bind(this),
      error:function(xhr,status,err){
        this.setState({userName:null});
        alert(err);
      }.bind(this)
    });
  }
  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }
  handleFormSubmit(username){
    this.setState({userName:username},function(){
      this.getUserData();
      this.getUserRepos();
    });
  }

  render(){
    return(
      <div>
        {/*<Profile userData={this.state.userData} userRepos={this.state.userRepos} />*/}
        <SearchBar onFormSubmit={this.handleFormSubmit.bind(this)}/>
        <Profile {...this.state} />
      </div>
    );
  }
}
App.propTypes={
clientId:React.PropTypes.string,
clientSecret:React.PropTypes.string
};

App.defaultProps={
clientId:consts.clientId,
clientSecret:consts.clientSecret
};

export default App;
