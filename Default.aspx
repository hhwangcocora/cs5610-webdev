<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>
<html  class="background-img">
<head lang="en">
    <meta charset="UTF-8">
    <title>Homepage of Huihong</title>
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="stylesheet" href="css/homepage.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="experiments/js/angular.min.js"></script>
    <script src="javascript/homepage.js"></script>
</head>
<body>
    <div class="background-gray top-margin-10" id="navigation">
        <div class="container">
            <a class="nav-main active" href="#homePage">HOME</a>
            <a class="nav" href="#project" id="project-tab">Project</a>
            <a class="nav" href="story/index.htm?../experiments/story.txt" target="_blank">Experiments</a>
            <a class="nav" href="https://github.com/hhwangcocora/cs5610-webdev" target="_blank">Github</a>
        </div>
    </div>
    <div class="container top-margin-10">
        <div id="homePage" class="tabs  top-margin-100">
            <div class="row">
                <div class="col-4 align-right"><img class="picture-large picture-border" src="images/homepage/my.jpg"></div>
                <div class="col-7">
                    <div><img src="images/homepage/name.png" style="width: 250px; height: 65px;"></div>
                    <div class="white text-xlarge text-aria top-margin-10" ><strong>I'm pursuing Master of Science in Computer Science @Northeastern University</strong></div>
                    <div class="lightgray text-small text-aria top-margin-10">I will graduate soon on May 2015, and before that I have 4 years working experience as a software engineer</div>
                    <div class="blue text-small text-aria top-margin-5">Please reach me at wang.huih@husky.neu.edu</div>
                    <div class="top-margin-10">
                        <a class="button animation-color-change" type="button" href="#project"  id="projectSite">Projects &#9658;</a>
                        <a class="button" href="story/index.htm?../experiments/story.txt" target="_blank">Experiments &#9658;</a>
                        <a class="button" type="button" href="https://github.com/hhwangcocora/cs5610-webdev" target="_blank">Github &#9658;</a>
                    </div>
                </div>
            </div>
        </div>

        <div id="project" class="tabs top-margin-50">
            <div class="row">
                <div class="col-4">
                    <div class="row align-center"><img src="images/homepage/document.png" class="picture-small"></div>
                    <div class="row">
                        <div class="accordion top-margin-10">
                            <a href="#document" class="accordion-title"> &#9655; DOCUMENTS</a>
                            <div class="accordion-content" id="document">
                                <p class="blue text-aria">Click to visit the page <a href="#">Documents</a></p>
                                <p class="lightgray text-aria">Design documents, code snippet and references</p>
                                <p class="lightgray text-aria">It provides the architecture graph of the web site, together with detailed descriptions of key components</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row align-center"><img src="images/homepage/project.png" class="picture-small"></div>
                    <div class="row">
                        <div class="accordion top-margin-10">
                            <a href="#myProject" class="accordion-title active"> &#9655; PROJECT SITE</a>
                            <div class="accordion-content open" id="myProject">
                                <p class="blue text-aria">Click to visit the site <a href="http://nodejs-hhwang.rhcloud.com/project/" target="_blank">Pomodoro site</a></p>
                                <p class="lightgray text-aria">This project is about time recording and sharing</p>
                                <p class="lightgray text-aria">User can view time statistics and share status with friends</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row align-center"><img src="images/homepage/github.png" class="picture-small"></div>
                    <div class="row">
                        <div class="accordion top-margin-10">
                            <a href="#projectGithub" class="accordion-title"> &#9655; GITHUB FOR OPENSHIFT</a>
                            <div class="accordion-content" id="projectGithub">
                                <p class="blue text-aria">Click to visit github <a href="https://github.com/hhwangcocora/cs5610-webdev-openshift" target="_blank">Github for openshift</a></p>
                                <p class="lightgray text-aria">Source code for this project on github</p>
                                <p class="lightgray text-aria">The project uses MEAN stack, with site built on openshift platform, thus this github is different from the one used for experiments</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="footer align-right">
        <div class="col-1 align-left">
            <div class="white">&#9679;<a href="source/">Source</a></div>
            <div class="white">&#9679;<a href="search/">Search</a></div>
        </div>
        <div class="col-1 align-left">
            <div class="white">&#9679;<a href="searchtree/">SearchTree</a></div>
            <div class="white">&#9679;<a href="textview/">TextView</a></div>
        </div>
        <div class="col-1 align-left">
            <div class="white">&#9679;<a href="filelist.aspx" target="_blank">FileList</a></div>
            <div class="white">&#9679;<a href="autofile.aspx" target="_blank">AutoFile</a></div>
        </div>
        <div class="col-1 align-left">
            <div class="white">&#9679;<a href="images/autoimage.aspx" target="_blank">Images</a></div>
            <div class="white">&#9679;<a href="blog/" target="_blank">Blog</a></div>

        </div>
    </div>
</body>


</html>