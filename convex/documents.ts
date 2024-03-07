import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const createPost = mutation({
    args: {
        tag: v.string(),
        description: v.string(),
        image: v.optional(v.string()),
        title: v.string(),
        userName: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized');
        }

        const userRecord = await ctx.db.query("users").filter(q => q.eq(q.field("name"),args.userName)).first();
       
            const document = await ctx.db.insert('posts', {
                user_id:userRecord!._id,
                tag: args.tag,
                description: args.description,
                image: args.image,
                likes: 0,
                comments: [],
                title: args.title,
            });
        

        return document;
    },
});

export const updateProfile = mutation({
    args: {
        bio: v.optional(v.string()),
        college: v.optional(v.string()),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized');
        }

        const userRecord = await ctx.db.query("users").filter(q => q.eq(q.field("name"),args.name)).first();
        if(userRecord){
            await ctx.db.patch(userRecord._id, { bio: args.bio, college: args.college });
            return userRecord;
        }

        const document = await ctx.db.insert('users', {
            bio: args.bio || '',
            college: args.college || '',
            name: args.name,
        });

        return document;
    },
});

export const getPosts = query({
    handler: async (ctx) => {
        const posts = await ctx.db.query("posts").collect();
        
        return posts;
    },
});

export const getUser = query({
    args: {id: v.id("users")},
    handler: async (ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity)
            throw new Error("Not authenticated");

        const user = await ctx.db.get(args.id)

        if(!user)
            throw new Error("Not Found")

        return user;
    },
});

export const getUserProfile = query({
    args: {
        name: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("name"), args.name)).first()
        return user;
    },
});

export const getPostById = query({
    args: {
        id: v.id('posts')
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.id)
        return post;
    },
});