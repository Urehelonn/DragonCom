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
    
    
    v1.00
    This Version only reqires user to be able to create new post, check new post from index page, delete existing page, and update existing page.
    Restful Routing map below:
    
    Name                Path                Http Verb           Mongoose Method             Purpose
    -------------------------------------------------------------------------------------------------------------------------------
    Index               /blogs              GET                 Blog.find({})               List all posts.
    New                 /blogs/new          GET                 N/A                         Form to add new blog.
    Create              /blogs              POST                Blog.create({blog})         Add new blog from page new to database.
    Show                /blogs/:id          GET                 Blog.findById()             Show blog detail.
    Edit                /blogs/:id/edit     GET                 Blog.findById()             Edit certain blog.
    Update              /blogs/:id          PUT                 Blog.findByIdAndUpdate()    After edit, update that blog.
    Delete              /blogs/:id          DELETE              Blog.findByIdAndRemove()    Remove certain blog.
    