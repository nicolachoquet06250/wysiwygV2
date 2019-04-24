// TODO personaliser le player

function load_videos() {
    document.querySelectorAll('wysiwyg .editor .video').forEach(video => {
        let videos = [];
        if(video.hasAttribute('data-video') || video.hasAttribute('data-videos')) {
            videos = video.hasAttribute('data-video') ? [video.getAttribute('data-video')] : JSON.parse(video.getAttribute('data-videos'));
        }
        videos.forEach(_video => {
            if(!video.querySelector(`.media-video-${_video}`)) {
                let video_container = document.createElement('div');

                let video_media = document.createElement('video');
                video_media.classList.add('media-video');
                video_media.classList.add(`media-video-${_video}`);
                video_media.setAttribute('controls', 'true');
                video_media.setAttribute('preload', 'true');

                let source_mp4 = document.createElement('source');
                source_mp4.setAttribute('src', `/videos/mp4/${_video}.mp4`);
                source_mp4.setAttribute('type', 'video/mp4');
                video_media.append(source_mp4);

                let source_webm = document.createElement('source');
                source_webm.setAttribute('src', `/videos/webm/${_video}.webm`);
                source_webm.setAttribute('type', 'video/webm');
                video_media.append(source_webm);

                video_container.append(video_media);

                video.append(video_container);
            }
        });
    });
}

window.addEventListener('load', load_videos);