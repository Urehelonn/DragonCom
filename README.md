# DragonCom
    This is a wonderful community for dragons!
    =====================================================
    
    1. There are posts store in the database wrote by different dragons.
    2. All dragons needs to login in order to proceed.
    3. All dragons needs to be authorized in order to add post, no need for viewing though.
       - In order to keep it clean, the post can only be edited and deleted by whoever posted it original.
    4. Every post contains title, created time, text body, author's basic information and maybe a image.
       - Posts can have comments as well, same rule as the main posts, besides no image allowed, no title, no comments, can take a reply.
    5. Each individual dragons need to states their general information and log in information.
       - Log in information includes username and password.
       - General information includes: Name, Spicies, Age, Colour, Title, Gender, and Self introduction.
    6. Every dragons information are stored in the database.
    
    
    v1
    This Version only reqires user to be able to create new post, check new post from index page, delete existing page, and update existing page.
    Also need functions about commenting, no signin needed for now.
    Restful Routing map below:
    
    Name                Path                Http Verb           Mongoose Method             Purpose
    -------------------------------------------------------------------------------------------------------------------------------
    Index               /blogs                  GET                 Blog.find({})               List all posts.
    New                 /blogs/new              GET                 N/A                         Form to add new blog.
    Create              /blogs                  POST                Blog.create({blog})         Add new blog from page new to database.
    Show                /blogs/:id              GET                 Blog.findById()             Show blog detail.
    Edit                /blogs/:id/edit         GET                 Blog.findById()             Edit certain blog.
    Update              /blogs/:id              PUT                 Blog.findByIdAndUpdate()    After edit, update that blog.
    Delete              /blogs/:id              DELETE              Blog.findByIdAndRemove()    Remove certain blog.
    
    Comments:
    NEW             /blogs/:id/comments/new     GET                 Blog.findById()             Form to add new comment.
    CREAT           /blogs/:id/comments         POST                Blog.findById()             Add new comment.
    
    
     v2
     Based on v1, add authentication, and user database and so on.
         2.13: v2 finished
             The user database is created, and use passport-local-mongoose for encryption.
             User only see blogs after login, and abled signup function, also logout.
             
    
     v3
     Based on v2, add more aboud user, with detailed user information, and link to check each states or the other user's public information.
        
        v3.00
        Create proper UserInfo mongoose model, and import.