window.onload = () => {
    function build_fake_posts(posts_min_width = null, posts_max_width = null) {
        let posts_list = document.querySelector('.post-list');
        [
            {
                author: 1,
                toolbar: [
                    {
                        tag: 'input',
                        type: 'button',
                        value: 'Citer',
                        classList: [
                            'cite'
                        ]
                    }
                ],
                header: {
                    profile_pic: 'https://openclassrooms.com/bundles/common/images/avatar_defaut.png',
                    text: 'Nicolas Choquet'
                },
                content: 'Voila du text de test avec un smile <img src="./images/smiles/smile.png" class="smile" alt=":)">  '
            },
            {
                author: 2,
                toolbar: [
                    {
                        tag: 'input',
                        type: 'button',
                        value: 'Citer',
                        classList: [
                            'cite'
                        ]
                    }
                ],
                header: {
                    profile_pic: 'https://openclassrooms.com/bundles/common/images/avatar_defaut.png',
                    text: 'Yann Choquet'
                },
                content: 'Voila du text de test avec un smile <img src="./images/smiles/smile.png" class="smile" alt=":)">  '
            },
            {
                author: 1,
                toolbar: [
                    {
                        tag: 'input',
                        type: 'button',
                        value: 'Citer',
                        classList: [
                            'cite'
                        ]
                    }
                ],
                header: {
                    profile_pic: 'https://openclassrooms.com/bundles/common/images/avatar_defaut.png',
                    text: 'Nicolas Choquet'
                },
                content: 'Voila du text de test avec un smile <img src="./images/smiles/smile.png" class="smile" alt=":)">  '
            },
            {
                author: 2,
                toolbar: [
                    {
                        tag: 'input',
                        type: 'button',
                        value: 'Citer',
                        classList: [
                            'cite'
                        ]
                    }
                ],
                header: {
                    profile_pic: 'https://openclassrooms.com/bundles/common/images/avatar_defaut.png',
                    text: 'Yann Choquet'
                },
                content: 'Voila du text de test avec un smile <img src="./images/smiles/smile.png" class="smile" alt=":)">  '
            },
            {
                author: 1,
                toolbar: [
                    {
                        tag: 'input',
                        type: 'button',
                        value: 'Citer',
                        classList: [
                            'cite'
                        ]
                    }
                ],
                header: {
                    profile_pic: 'https://openclassrooms.com/bundles/common/images/avatar_defaut.png',
                    text: 'Nicolas Choquet'
                },
                content: 'Voila du text de test avec un smile <img src="./images/smiles/smile.png" class="smile" alt=":)">  '
            },
            {
                author: 2,
                toolbar: [
                    {
                        tag: 'input',
                        type: 'button',
                        value: 'Citer',
                        classList: [
                            'cite'
                        ]
                    }
                ],
                header: {
                    profile_pic: 'https://openclassrooms.com/bundles/common/images/avatar_defaut.png',
                    text: 'Yann Choquet'
                },
                content: 'Voila du text de test avec un smile <img src="./images/smiles/smile.png" class="smile" alt=":)">  '
            },
            {
                author: 1,
                toolbar: [
                    {
                        tag: 'input',
                        type: 'button',
                        value: 'Citer',
                        classList: [
                            'cite'
                        ]
                    }
                ],
                header: {
                    profile_pic: 'https://openclassrooms.com/bundles/common/images/avatar_defaut.png',
                    text: 'Nicolas Choquet'
                },
                content: 'Voila du text de test avec un smile <img src="./images/smiles/smile.png" class="smile" alt=":)">  '
            },
            {
                author: 2,
                toolbar: [
                    {
                        tag: 'input',
                        type: 'button',
                        value: 'Citer',
                        classList: [
                            'cite'
                        ]
                    }
                ],
                header: {
                    profile_pic: 'https://openclassrooms.com/bundles/common/images/avatar_defaut.png',
                    text: 'Yann Choquet'
                },
                content: 'Voila du text de test avec un smile <img src="./images/smiles/smile.png" class="smile" alt=":)">  '
            }
        ].forEach(post => {
            let post_container = document.createElement('div');
            let _post = document.createElement('div');
            _post.setAttribute('data-author', post.author);
            if(posts_min_width !== null) _post.style.minWidth = posts_min_width + 'px';
            if(posts_max_width !== null) _post.style.maxWidth = posts_max_width + 'px';
            _post.classList.add('post');

            let toolbar = document.createElement('div');
            toolbar.classList.add('post-toolbar');
            post.toolbar.forEach(elem => {
                let _elem = document.createElement(elem.tag);
                _elem.setAttribute('type', elem.type);
                _elem.value = elem.value;
                _elem.classList = elem.classList;

                toolbar.append(_elem);
            });

            _post.append(toolbar);

            let header = document.createElement('div');
            header.classList.add('header');
            let profile_pic = document.createElement('div');
            profile_pic.classList.add('profile-pic');
            profile_pic.style.backgroundImage = "url('" + post.header.profile_pic + "')";
            header.append(profile_pic);
            header.append(document.createTextNode(post.header.text));

            _post.append(header);

            let content = document.createElement('div');
            content.classList.add('content');
            content.innerHTML = post.content;

            _post.append(content);

            post_container.append(_post);

            posts_list.append(post_container);
        });

        init_posts();
        init_citation_buttons();
    }

    build_fake_posts();
};