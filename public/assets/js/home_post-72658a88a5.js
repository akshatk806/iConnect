{let t=function(){let t=$("#new-post-form");t.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:function(t){console.log(t);let o=e(t.data.post);$("#posts-list-container>ul").prepend(o),n($(".delete-post-button",o)),new ToggleLike($(".toggle-like-button",o)),new Noty({theme:"relax",text:"Post Published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},e=function(t){return $(`<li id="post-${t._id}">               \n                    <p>\n                        <small>\n                            <a class="delete-post-button" href="/posts/delete/${t._id}">x</a>\n                        </small>\n                        ${t.content}\n                        <br>\n                        <small style="color: blue;">\n                            <strong>${t.user.name}</strong> \n                        </small>\n                        <br>\n                        <small>\n                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post">\n                                0 likes\n                            </a>\n                        </small>\n                    </p>\n                \n                    <div class="post-comments">\n                \n                        <form id="post-${t._id}-comments-form" action="/comments/create" method="POST">\n                            <input type="text" name="content" placeholder="Add a comment...">\n                            <input type="hidden" name="post" value="${t._id}">\n                            <input type="submit" value="Add comment">\n                        </form>\n                        \n                        <div class="post-comments-list">\n                            <ul id="post-comments-${t._id}">\n        \n                            </ul>\n                        </div>\n                        \n                    </div>\n                </li>`)},n=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){console.log(t),$(`#post-${t.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post Deleted!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},o=function(){$("#posts-list-container>ul>li").each((function(){let t=$(this),e=$(".delete-post-button",t);n(e);let o=t.prop("id").split("-")[1];new PostComments(o)}))};t(),o()}