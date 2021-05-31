---


---

<h1 id="connect-4-webapp-with-computer-bot">CONNECT-4 WEBAPP with COMPUTER BOT</h1>
<h3 id="mentors">MENTORS</h3>
<ul>
<li>Adithya Rajesh</li>
<li>Anirudh Achal</li>
</ul>
<h3 id="members"><a href="https://github.com/Dhruvil-Lakhtaria/Connect4#membors"></a>MEMBERS</h3>
<ul>
<li>Dhruvil Lakhtaria</li>
<li>Pranav RS</li>
</ul>
<h1 id="project-goal">Project Goal</h1>
<p>The aim of the project was to implement a connect 4 webapp with an intelligent computer bot which makes the best possible move based on the current board state.</p>
<h2 id="section"></h2>
<h2 id="what-is-connect-4">What is Connect-4</h2>
<p>Connect-4 is a two-player board game in which player tries to connect 4 dots of his color and opponent does the same. The dot is dropped on the lower most empty row of the column chose.<br>
<a href="https://github.com/Dhruvil-Lakhtaria/Connect4/blob/master/readme_images/board.JPG"><img src="https://github.com/Dhruvil-Lakhtaria/Connect4/raw/master/readme_images/board.JPG" alt="CONNECT4 GAME BOARD"></a></p>
<h2 id="section-1"></h2>
<h2 id="minimax-algorith">MINIMAX ALGORITH</h2>
<p>Minimax algorithm is a backtracking algorithm that has two parts namely maximiser and minimizer. The maximiser tries to maximize the score while the minimizer tries to minimize the score as much as possible.</p>
<p>Each board state has a value associates to it and maximiser tries to make the move such that the value increases while the minimizer does the opposite.</p>
<p><a href="https://github.com/Dhruvil-Lakhtaria/Connect4/blob/master/readme_images/minimax-tree.png"><img src="https://github.com/Dhruvil-Lakhtaria/Connect4/raw/master/readme_images/minimax-tree.png" alt="MINIMAX-TREE"></a></p>
<p>For Example, consider the above image where the evaluation is done till 4 level and then scores are evaluated. Here score is random but in the project, scoring is done based in heuristic analysis.</p>
<p>Here going down the first branch we get 10 and Infinity, being minimizers turn it selects 10.</p>
<p>Returns 10 to level 2 then now going down the second branch from 1node of level 2 we get 5 and since it is maximisers turn now so it stays 10 rather than taking 5 .</p>
<p>This way each and every possible move to a certain depth is analyzed.</p>
<h2 id="section-2"></h2>
<h3 id="alpha-beta-pruning">Alpha-Beta Pruning</h3>
<p>Further alpha beta pruning is done to improve the time complexity.</p>
<p>Currently it is O(7^d) where d is the depth.(Which can be max 42(that is the no of cells) but it is not implementable, It is kept 8)</p>
<p>We can avoid going down the recursive tree from where we would not get the desired result or outcome.</p>
<p>We introduce two new parameter alpha and beta which are minimum maximizer score and maximum minimizer score respectively.</p>
<p>Condition is if alpha &gt; beta then we don’t need to evaluate that branch further.</p>
<p><a href="https://github.com/Dhruvil-Lakhtaria/Connect4/blob/master/readme_images/alpha-beta.png"><img src="https://github.com/Dhruvil-Lakhtaria/Connect4/raw/master/readme_images/alpha-beta.png" alt="Alpha-Beta Pruning"></a></p>
<p>In above image going down from 5 to the second branch till seven ,then to 4 since it is minimizers turn 4 is picked over 7,Now observe ,the turn is of minimizer and already 5(alpha) &gt; 4(beta).Now the most favorable outcome we can get after traversing further branches is 4 as now minimizer will pick min(4,further nodes),so going down the further branches is useless and we can cut these branches off. Similar process is done everywhere.</p>
<h2 id="section-3"></h2>
<h1 id="getting-started-with-create-react-app">Getting Started with Create React App</h1>
<p>This project was bootstrapped with  <a href="https://github.com/facebook/create-react-app">Create React App</a>.</p>
<h2 id="available-scripts"><a href="https://github.com/Dhruvil-Lakhtaria/Connect4#available-scripts"></a>Available Scripts</h2>
<p>In the project directory, you can run:</p>
<h3 id="npm-start"><a href="https://github.com/Dhruvil-Lakhtaria/Connect4#npm-start"></a><code>npm start</code></h3>
<p>Runs the app in the development mode.<br>
Open  <a href="http://localhost:3000/">http://localhost:3000</a>  to view it in the browser.</p>
<p>The page will reload if you make edits.<br>
You will also see any lint errors in the console.</p>
<h3 id="npm-run-build"><a href="https://github.com/Dhruvil-Lakhtaria/Connect4#npm-run-build"></a><code>npm run build</code></h3>
<p>Builds the app for production to the  <code>build</code>  folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.</p>
<p>The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!</p>
<p>See the section about  <a href="https://facebook.github.io/create-react-app/docs/deployment">deployment</a>  for more information.</p>
<h3 id="npm-run-deploy"><a href="https://github.com/Dhruvil-Lakhtaria/Connect4#npm-run-deploy"></a><code>npm run deploy</code></h3>
<p>Creates a new branch gh-pages in your repository and deploys the app. Make Sure to change the Homepage address in package.json and give it a appropriate url like  <code>"homepage":"https://github-account-name.github.io/Project-Name",</code>.</p>
<p>Also add the deploy in scripts in package.json as  <code>"deploy" : "gh-pages -d build"</code></p>
<p>Then run the command  <code>npm run deploy</code></p>

