import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    posts: defineTable({
        user_id: v.id("users"),
        likes: v.number(),
        title: v.string(),
        comments: v.array(v.string()),
        tag: v.string(),
        description: v.string(),
        image: v.optional(v.string()),
    }).index('by_tag', ["tag"]),

    users: defineTable({
        name: v.string(),
        // tags: v.array(v.string()),
        college: v.string(),
        bio: v.string(),
    }),

    // userTags: defineTable({
    //     name: v.array(v.string()),
    // userid
    //tag
    // })
});