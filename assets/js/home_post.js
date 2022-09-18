{

    // Method to submit the form data(post) for new post using AJAX
    let createPost=function(){
        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(event){
            event.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){                       // the data inside () is reponse data which is JSON
                    console.log(data);
                    // console.log(data.data)
                    let newPost=newPostDOM(data.data.post)
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));

                    // call the create comment class
                    // new PostComments(data.data.post._id);

                    new ToggleLike($('.toggle-like-button',newPost))

                    new Noty({
                        theme:'relax',
                        text:'Post Published!',
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();
                },
                error:function(error){
                    console.log(error.responseText)
                }
            })  
        })
    }

    // Method to create a post and showing it on the DOM
    let newPostDOM=function(post){
        return $(`<li id="post-${post._id}">               
                    <p>
                        <small>
                            <a class="delete-post-button" href="/posts/delete/${ post._id }">x</a>
                        </small>
                        ${post.content}
                        <br>
                        <small style="color: blue;">
                            <strong>${post.user.name}</strong> 
                        </small>
                        <br>
                        <small>
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                0 likes
                            </a>
                        </small>
                    </p>
                
                    <div class="post-comments">
                
                        <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Add a comment...">
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add comment">
                        </form>
                        
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
        
                            </ul>
                        </div>
                        
                    </div>
                </li>`)
    }


    // Method to delete a post from DOM
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault()
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),         // href of anchor tag
                success:function(data){
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme:'relax',
                        text:'Post Deleted!',
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        })
    }

    // loop over all the existing posts on the page (when the window reloads for the first time) and call the delete post method on delete link of each, also add AJAX (using class we've created) to the delete button of each 
    let convertPostsToAjax=function(){
        $('#posts-list-container>ul>li').each(function(){
            let self=$(this);
            let deleteButton=$('.delete-post-button',self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId=self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
}