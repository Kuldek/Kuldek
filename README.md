# Temiloluwa Olanipekun

I build products around the details people have to keep track of at work. For a creative team, that can be as simple as knowing which version of a script the client actually approved. I use AI-assisted development to take those problems from a workflow sketch to a working interface.

## Try my work

| Project | What you can try |
| --- | --- |
| [Maverick Motion](https://temiloluwa-product-studio.netlify.app/projects/maverick-motion/demo/) | Edit a sample script and follow it through internal review and client approval. |
| [Afro-Technical Research Consortium](https://temiloluwa-product-studio.netlify.app/projects/afro-technical-research-consortium/demo/) | Register for a sample workshop, then find the booking from the administrator’s side. |
| [Captain Fitness](https://temiloluwa-product-studio.netlify.app/projects/captain-fitness/demo/) | Log a set during a sample workout and see how the session progresses. |

The [full product portfolio](https://temiloluwa-product-studio.netlify.app/) includes five interactive demos and the design decisions behind each one.

## Code you can try

**[Reply Review Lab](https://github.com/Kuldek/reply-review-lab)** is a small, offline tool for evaluating AI support replies. Read a fictional customer request and its policy, compare two possible answers, then record which one you would send and why. The sample replies are prewritten so every reviewer can evaluate the same cases.

[Try Reply Review Lab in your browser](https://kuldek.github.io/reply-review-lab/)

Suppose a client approves a script, then someone changes the last line. Is the revised script ready to record? The [script review example](https://github.com/Kuldek/Kuldek/blob/main/script-review.mjs) models that decision. Each approval belongs to a specific version. Editing the text creates a new version that needs its own review.

This is a standalone example written with fictional records. Run it locally with Node.js 20 or later. The [tests](https://github.com/Kuldek/Kuldek/blob/main/script-review.test.mjs) exercise the review rules.

```sh
node script-review.mjs
node --test script-review.test.mjs
```
