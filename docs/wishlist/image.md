# Image

With functional values, we can implement more advanced capture and replace methods.  The `*-img*` property can be configured to redirect a _short name_ to a static path location:

    polyclass.staticPath = 'https://imghost/foo/bar?name='

Usage rebinds the inbound path:

    <div class='background-image-img-apples'></div>

result

    {
        background-image: url('https://imghost/foo/bar?name=apples');
    }

