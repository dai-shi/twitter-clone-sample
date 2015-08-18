twitter-clone-sample
====================

This is a sample application to show how
[social-cms-backend](https://github.com/dai-shi/social-cms-backend)
is usable.

The original code: 
[20130804_recorded](https://github.com/dai-shi/twitter-clone-sample/tree/20130804_recorded)
is exactly the same as
[screencast](http://dai-shi.github.io/social-cms-backend/ttyplay.html)
result.

The running code:
[20130920_openshift](https://github.com/dai-shi/twitter-clone-sample/tree/20130920_openshift)
can be tried at
[OpenShift server](http://twitterclonesample-nodeangularapp.rhcloud.com/).

Changes
-------

* use combined request to avoid many requests for getting likecount for each post [7d68bed](https://github.com/dai-shi/twitter-clone-sample/commit/7d68bed8fe393e4ade0862265e51c111fd953257).
* update to work with express 4 and SCB 0.7.0 [36bfaea](https://github.com/dai-shi/twitter-clone-sample/commit/36bfaeaaccec10abf02eadca1eb342695a5ba61b).
