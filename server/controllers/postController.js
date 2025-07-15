import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  
  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { content: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  const count = await Post.countDocuments({ ...keyword, isPublished: true });
  const posts = await Post.find({ ...keyword, isPublished: true })
    .populate('category', 'name')
    .populate('author', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({ posts, page, pages: Math.ceil(count / pageSize), count });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('category', 'name')
    .populate('author', 'name');

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, excerpt, isPublished } = req.body;

  const post = new Post({
    title,
    content,
    category,
    author: req.user._id,
    slug: slugify(title, { lower: true }),
    excerpt: excerpt || content.substring(0, 200),
    isPublished: isPublished || false,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const { title, content, category, excerpt, isPublished } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    post.excerpt = excerpt || post.excerpt;
    post.isPublished = isPublished !== undefined ? isPublished : post.isPublished;

    if (title) {
      post.slug = slugify(title, { lower: true });
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.remove();
    res.json({ message: 'Post removed' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

export { getPosts, getPostById, createPost, updatePost, deletePost };