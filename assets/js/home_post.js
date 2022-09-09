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
                success:function(data){
                    let newPost=newPostDOM(data.data.post)
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));
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
                    </p>
                
                    <div class="post-comments">
                
                            <form action="/comments/create" method="POST">
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
                    $(`#post-${data.data.post_id}`).remove()
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        })
    }

    createPost();
}