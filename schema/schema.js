const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLInt,
} = require('graphql');
const { GraphQLList } = require('graphql/type/definition');
const axios = require('axios');

const userType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		name: { type: GraphQLString },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		address: { type: addressQuery },
	}),
});

const addressQuery = new GraphQLObjectType({
	name: 'Address',
	fields: () => ({
		street: { type: GraphQLString },
		suite: { type: GraphQLString },
		city: { type: GraphQLString },
		zipcode: { type: GraphQLString },
	}),
});

const postsQuery = new GraphQLObjectType({
	name: 'Posts',
	fields: () => ({
		id: { type: GraphQLInt },
		title: { type: GraphQLString },
		body: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'root',
	fields: {
		users: {
			type: new GraphQLList(userType),
			resolve(parent, args) {
				return axios
					.get(`https://jsonplaceholder.typicode.com/users`)
					.then((res) => res.data);
			},
		},
		posts: {
			type: new GraphQLList(postsQuery),
			resolve(parent, args) {
				return axios
					.get(`https://jsonplaceholder.typicode.com/posts`)
					.then((res) => res.data);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
