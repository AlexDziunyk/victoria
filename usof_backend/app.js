const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');


const storage = multer.memoryStorage(); // Store the file in memory as a Buffer
const upload = multer({ storage: storage });

const User = require('./models/user');

//routes
const authRoute = require('./routes/authRoutes');
const postsRoute = require('./routes/postsRoutes');
const likesRoute = require('./routes/likesRoutes');
const categoriesRoute = require('./routes/categoriesRoutes');
const commentsRoute = require('./routes/commentsRoutes');
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');

const corsOptions = {
    origin: '*',
  };

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
app.use('/api/likes', likesRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/comments', commentsRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);

app.listen(3001, () => {
    console.log("Listening...");
})