import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    centerAll: {
        justifyContent: 'center',
        alignItems: 'center',
    },
	iconColor: {
		color: '#2E5C65',
	},
	backgroundColor: {
		backgroundColor: '#2E5C65',
	},
	borderColor: {
		borderColor:'#2E5C65',
	},


/*********************/
/**** CSS SIDEBAR ****/
	sidebarTopHeigthHeaderLogo: {
		height:  Platform.OS === 'ios' ? 100 : 80,
	},
	sidebarHeaderLogo:{
		alignContent:'center', 
		alignItems:'center', 
		padding:5, 
		borderBottomWidth:1,
		top: Platform.OS === 'ios' ? 25 : 10,
	},
	sidebarClose: {
		position:'absolute',
		top: Platform.OS === 'ios' ? 25 : 10,
		right:10
	},
	sidebarNavBarItemHeader:{
		paddingLeft: 5,
		paddingTop: 8,
		paddingBottom: 8,
	},
	sidebarNavBarItemCont: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	sidebarNavBarImg: {
		paddingLeft: 5,
		width: 35, 
		flexDirection: 'row',
		alignItems: 'center',
	},
	sidebarNavBarItemTxt: {
		paddingLeft: 5,
		fontSize: 16,
	},
	sidebarIconSize: {
		fontSize: 35,
	},
	sidebarFooterCont: {
		alignItems: 'center', 
		flexDirection: 'row', 
		width:'100%', 
		textAlign: 'center',
	},
	sidebarFooterIcons: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center', 
		flexDirection: 'row', 
		width:'100%'
	},
/**** END CSS SIDEBAR ****/
/************************/


/*********************/
/**** CSS SEARCH ****/

	searchCont: {
		justifyContent: 'center',
		flex: 1,
		padding: 16,
	},
	searchTxtInput: {
		fontSize: 16,
		height: 40,
		borderWidth: 1,
		paddingLeft: 10,
		backgroundColor: '#FFFFFF',
	},
	searchTxtStyle: {
		padding: 10,
		fontSize: 16,
	},
	searchBtnCurrentLocation: {
		height: 50, 
		borderWidth:1, 
		justifyContent: 'center', 
		alignItems: 'center',
	},


/**** END CSS SEARCH ****/
/************************/
    
})