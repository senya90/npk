import React from 'react'
import {Author} from "../../../models/author/Author";

export type CustomIcon = {
    viewBox: string
    image: JSX.Element,
    author: Author
}

export const customIcons: any = {
    'Fertilizer': {
        viewBox: '0 0 512 512',
        image: (
            <g id="Fertilizer">
                <g id="Outline">
                <path d="M464.609,438.491C466.857,428.064,472,395.121,472,312c0-14.082-3.3-41.432-9.805-81.289a8,8,0,1,0-15.791,2.578c6.278,38.458,9.6,65.676,9.6,78.711,0,99.945-7.539,125.3-7.589,125.47a8,8,0,0,0,.933,6.968l14.465,21.7c-1.364,7.3-9.843,10.211-16.853,6.708a8,8,0,0,0-5.321-.652C440.57,472.431,334.174,496,256,496S71.43,472.431,70.365,472.192a7.994,7.994,0,0,0-5.321.652c-7.029,3.512-15.494.569-16.853-6.708C77.679,418.376,56,483.814,56,312c0-13.035,3.318-40.253,9.6-78.711a8,8,0,1,0-15.791-2.578C43.3,270.568,40,297.918,40,312c0,83.121,5.143,116.064,7.391,126.491L33.344,459.563c-3.37,5.052-.738,19.486,10.895,26.678a28.316,28.316,0,0,0,25.2,2.13C86.618,492.094,181.937,512,256,512s169.382-19.906,186.558-23.629a28.323,28.323,0,0,0,25.2-2.13c11.634-7.192,14.264-21.626,10.895-26.678Z"/>
                <path d="M456,128H56c-20.8,0-31.6,24.683-17.874,40C24.408,183.309,35.186,208,56,208H456c20.8,0,31.6-24.683,17.874-40C487.592,152.691,476.814,128,456,128ZM184,176H456a8,8,0,0,1,0,16H56a8,8,0,0,1,0-16h64a8,8,0,0,0,0-16H56a8,8,0,0,1,0-16H456a8,8,0,0,1,0,16H184a8,8,0,0,0,0,16Z"/>
                <path d="M320,407.657a8,8,0,0,0,0-16H302.518A48.107,48.107,0,0,0,263.5,352.723V333.57c11.779,3.893,23.73,3.3,34.71-2.586,22.3-11.955,36.542-44.691,37.138-46.079a8,8,0,0,0-5.912-11.024c-1.485-.273-36.636-6.519-58.931,5.434a41.62,41.62,0,0,0-14.879,13.278,41.615,41.615,0,0,0-14.88-13.278c-22.293-11.953-57.444-5.707-58.931-5.434a8,8,0,0,0-5.911,11.024c.595,1.388,14.842,34.124,37.137,46.079,11.018,5.908,22.9,6.426,34.459,2.669v18.982A48.108,48.108,0,0,0,208,391.657H192a8,8,0,1,0,0,16ZM315.7,288.348c-12.639,22.5-28.986,39.375-51.862,28.151-.039-.472-.087-.968-.146-1.5C267.6,290.294,290.751,286.481,315.7,288.348ZM247.426,316.5c-22.9,11.225-39.208-5.625-51.862-28.153,24.956-1.865,48.1,1.948,52.009,26.655C247.513,315.531,247.465,316.029,247.426,316.5ZM224.37,391.657c8.5-31.424,53.275-31.452,61.779,0Z"/>
                <path d="M292,448a108,108,0,0,0,0-216H220a108,108,0,0,0,0,216ZM128,340a92.1,92.1,0,0,1,92-92h72a92,92,0,0,1,0,184H220A92.1,92.1,0,0,1,128,340Z"/>
                <path d="M121.728,109.427C177.351,49.18,225.036,16,256,16s78.649,33.18,134.272,93.427a8,8,0,0,0,11.756-10.854C360.511,53.6,301.476,0,256,0S151.489,53.6,109.972,98.573a8,8,0,0,0,11.756,10.854Z"/>
                <circle cx="152" cy="168" r="8"/>
                <circle cx="216" cy="72" r="8"/>
                <circle cx="240" cy="40" r="8"/>
                <circle cx="256" cy="64" r="8"/>
                <circle cx="280" cy="48" r="8"/>
                <circle cx="296" cy="80" r="8"/>
                <circle cx="328" cy="104" r="8"/>
                <circle cx="272" cy="104" r="8"/>
                <circle cx="232" cy="104" r="8"/>
                <circle cx="184" cy="104" r="8"/>
            </g>
        </g>
        ),
        author: new Author('Pixelmeetup', 'https://www.flaticon.com/ru/authors/pixelmeetup', 'www.flaticon.com', 'https://www.flaticon.com/ru/')
    },
    'Flasks': {
        viewBox: '0 0 511 512',
        image: (
            <g>
                <path d="m207.203125 43.847656v84.34375.039063.039062 96.878907c0 28.949218 23.550781 52.5 52.5 52.5 28.945313 0 52.496094-23.550782 52.496094-52.5v-181.453126c3.125-1.101562 5.996093-2.875 8.410156-5.285156 4.25-4.25 6.589844-9.898437 6.589844-15.910156 0-.390625-.011719-.730469-.023438-1.0625-.277343-5.886719-2.847656-11.347656-7.25-15.359375-4.277343-3.917969-9.835937-6.078125-15.648437-6.078125h-89.996094c-6.007812 0-11.660156 2.339844-15.910156 6.589844s-6.589844 9.898437-6.589844 15.910156 2.339844 11.660156 6.589844 15.910156c2.523437 2.523438 5.542968 4.351563 8.832031 5.4375zm7.078125-28.847656h90.007812c2.019532 0 4.027344.777344 5.507813 2.140625 1.472656 1.359375 2.300781 3.089844 2.390625 4.988281l.011719.050782v.320312c-.011719 4.128906-3.371094 7.488281-7.5 7.5h-29.1875c-4.132813 0-7.5 3.371094-7.5 7.5 0 4.140625 3.367187 7.5 7.5 7.5h21.691406v75.730469h-52.5c-4.132813 0-7.5 3.367187-7.5 7.5 0 4.140625 3.367187 7.5 7.5 7.5h52.5v89.417969c0 20.675781-16.824219 37.5-37.5 37.5s-37.5-16.824219-37.5-37.5v-180.148438h23.289063c4.128906 0 7.5-3.359375 7.5-7.5 0-4.128906-3.359376-7.488281-7.480469-7.5-.082031-.019531-.160157 0-.242188 0-14.039062 0-14.367187 0-30.988281 0-4.128906-.011719-7.488281-3.371094-7.5-7.5.011719-4.128906 3.371094-7.488281 7.5-7.5zm0 0"/>
                <path d="m504.660156 425.675781-69.039062-119.167969c-3.050782-5.265624-5.726563-26.59375-5.726563-36.691406v-51.367187c10.042969-2.253907 17.574219-11.234375 17.574219-21.949219 0-.359375-.007812-.722656-.027344-1.078125-.546875-11.640625-10.390625-20.421875-22.898437-20.421875h-76.714844c-12.828125 0-22.5 9.242188-22.5 21.5 0 10.714844 7.527344 19.695312 17.570313 21.949219v51.367187c0 10.097656-2.675782 31.425782-5.722657 36.6875l-69.039062 119.171875c-22.210938 38.335938 5.414062 86.324219 49.75 86.324219h137.019531c44.304688 0 71.980469-47.957031 49.753906-86.324219zm-49.753906 71.324219h-137.019531c-32.746094 0-53.199219-35.449219-36.773438-63.804688l69.039063-119.171874c5.890625-10.167969 7.746094-37.40625 7.746094-44.207032v-50.816406h19.894531c4.140625 0 7.5-3.355469 7.5-7.5s-3.355469-7.5-7.5-7.5h-29.964844c-4.136719 0-7.5-3.363281-7.5-7.5 0-4.464844 3.886719-6.5 7.5-6.5h76.714844c3.675781 0 7.71875 1.917969 7.917969 6.136719.003906.121093.007812.242187.007812.363281 0 4.136719-3.363281 7.5-7.5 7.5h-17.214844c-4.144531 0-7.5 3.355469-7.5 7.5s3.355469 7.5 7.5 7.5h7.140625v50.816406c0 6.800782 1.855469 34.039063 7.75 44.207032l69.035157 119.171874c16.417968 28.335938-4 63.804688-36.773438 63.804688zm0 0"/>
                <path d="m443.902344 380.449219c-2.078125-3.585938-6.671875-4.804688-10.25-2.726563-3.585938 2.078125-4.804688 6.664063-2.726563 10.25l33.898438 58.464844c5.214843 9-1.265625 20.273438-11.679688 20.273438h-133.496093c-10.402344 0-16.898438-11.265626-11.675782-20.273438l31.730469-54.726562h72.710937c4.140626 0 7.5-3.359376 7.5-7.5 0-4.144532-3.359374-7.5-7.5-7.5h-77.03125c-2.675781 0-5.148437 1.421874-6.488281 3.734374l-33.898437 58.46875c-11.019532 19 2.675781 42.796876 24.652344 42.796876h133.496093c21.960938 0 35.679688-23.78125 24.65625-42.796876zm0 0"/>
                <path d="m373.902344 408.507812c0 4.140626-3.359375 7.5-7.5 7.5-4.144532 0-7.5-3.359374-7.5-7.5 0-4.144531 3.355468-7.5 7.5-7.5 4.140625 0 7.5 3.355469 7.5 7.5zm0 0"/>
                <path d="m418.898438 433.507812c0 4.140626-3.355469 7.5-7.5 7.5-4.140626 0-7.5-3.359374-7.5-7.5 0-4.144531 3.359374-7.5 7.5-7.5 4.144531 0 7.5 3.355469 7.5 7.5zm0 0"/>
                <path d="m383.898438 448.507812c0 4.140626-3.355469 7.5-7.5 7.5-4.140626 0-7.5-3.359374-7.5-7.5 0-4.144531 3.359374-7.5 7.5-7.5 4.144531 0 7.5 3.355469 7.5 7.5zm0 0"/>
                <path d="m176.492188 254.320312v-35.378906c10.003906-2.226562 17.570312-11.121094 17.570312-21.941406 0-12.511719-10.402344-22.5-22.917969-22.5h-76.71875c-6.011719 0-11.660156 2.339844-15.910156 6.589844s-6.589844 9.898437-6.589844 15.910156 2.339844 11.660156 6.589844 15.910156c3.058594 3.058594 6.851563 5.109375 10.972656 6.027344l-.039062 35.398438c-53.203125 18.507812-88.949219 68.804687-88.949219 125.160156-.003906 73.078125 59.394531 132.503906 132.492188 132.503906h.433593c72.820313-.230469 132.0625-59.671875 132.0625-132.5 0-56.351562-35.738281-106.648438-88.996093-125.179688zm-43.117188 242.679688c-64.84375.191406-117.878906-52.433594-117.875-117.503906 0-49.976563 31.699219-94.582032 78.878906-110.996094 6.050782-2.105469 10.117188-7.800781 10.117188-14.175781v-34.824219h13.277344c.082031 0 .160156.027344.242187 0 4.117187-.011719 7.480469-3.371094 7.480469-7.5s-3.359375-7.5-7.5-7.5h-23.570313c-4.128906-.011719-7.488281-3.371094-7.5-7.5.011719-4.128906 3.371094-7.488281 7.5-7.5h76.726563c4.078125 0 7.910156 3.152344 7.910156 7.5-.007812 4.128906-3.371094 7.488281-7.5 7.5h-23.558594c-4.128906 0-7.5 3.371094-7.5 7.5 0 4.140625 3.371094 7.5 7.5 7.5h.019532 13.46875v34.820312c0 6.375 4.074218 12.078126 10.132812 14.1875 47.171875 16.414063 78.863281 61.019532 78.863281 110.992188.003907 64.585938-52.535156 117.296875-117.113281 117.5zm0 0"/>
                <path d="m187.992188 333c-16.71875 0-29.480469 9.574219-39.757813 18.941406-3.0625 2.789063-3.28125 7.53125-.492187 10.59375 2.789062 3.066406 7.53125 3.285156 10.59375.492188 11.714843-10.671875 20.308593-15.027344 29.65625-15.027344 17.4375 0 33.039062 14.058594 32.460937 34.0625-.816406 17.199219-15.0625 30.9375-32.460937 30.9375-19.085938 0-33.894532-18.320312-49.570313-37.714844-16.023437-19.820312-34.1875-42.285156-60.425781-42.285156-12.480469 0-24.265625 4.804688-33.1875 13.527344-9.363282 9.152344-14.90625 22.007812-14.25 36.332031 1.785156 55.066406 47.054687 99.136719 102.464844 99.140625h.304687c57.835937-.183594 102.546875-48.308594 102.164063-101.90625.117187-24.765625-20.570313-47.09375-47.5-47.09375zm-54.714844 134h-.277344c-51.851562-.003906-88.410156-43.363281-87.476562-87.316406.425781-17.46875 14.996093-31.683594 32.472656-31.683594 19.074218 0 34.167968 18.664062 48.761718 36.714844 17.199219 21.28125 34.984376 43.285156 61.234376 43.285156 7.4375 0 14.480468-1.71875 20.753906-4.777344-15.113282 26.058594-43.28125 43.675782-75.46875 43.777344zm0 0"/>
                <path d="m80.496094 384.5c0 4.140625-3.355469 7.5-7.5 7.5-4.140625 0-7.5-3.359375-7.5-7.5s3.359375-7.5 7.5-7.5c4.144531 0 7.5 3.359375 7.5 7.5zm0 0"/>
                <path d="m125.496094 409.5c0 4.140625-3.359375 7.5-7.5 7.5s-7.5-3.359375-7.5-7.5 3.359375-7.5 7.5-7.5 7.5 3.359375 7.5 7.5zm0 0"/>
                <path d="m90.496094 424.5c0 4.140625-3.355469 7.5-7.5 7.5-4.140625 0-7.5-3.359375-7.5-7.5s3.359375-7.5 7.5-7.5c4.144531 0 7.5 3.359375 7.5 7.5zm0 0"/>
            </g>
        ),
        author: new Author('Freepik', 'https://www.freepik.com', 'www.flaticon.com', 'https://www.flaticon.com/ru/')
    },
    'Agriculture': {
        viewBox: '0 0 64 64',
        image: (
            <g>
                <path d="m15 48.949v13.051h2v-13.051c5.454-.494 9.76-4.985 9.978-10.513l2.729-2.729-1.414-1.414-2.729 2.729c-.41.016-.813.055-1.21.115 1.556-1.819 2.523-4.149 2.624-6.701l2.729-2.729-1.414-1.414-2.729 2.729c-.41.016-.813.055-1.21.115 1.556-1.819 2.523-4.149 2.624-6.701l2.729-2.729-1.414-1.414-2.729 2.729c-.41.016-.813.055-1.21.115 1.556-1.819 2.523-4.149 2.624-6.701l2.729-2.729-1.414-1.414-2.729 2.729c-2.386.094-4.577.946-6.339 2.33 1.508-2.795-1.326-8.081-2.225-9.625v-3.727h-2v3.727c-.899 1.544-3.733 6.83-2.225 9.625-1.762-1.384-3.953-2.236-6.339-2.33l-2.729-2.729-1.414 1.414 2.729 2.729c.101 2.552 1.067 4.882 2.624 6.701-.397-.06-.8-.099-1.21-.115l-2.729-2.729-1.414 1.414 2.729 2.729c.101 2.552 1.067 4.882 2.624 6.701-.397-.06-.8-.099-1.21-.115l-2.729-2.729-1.414 1.414 2.729 2.729c.101 2.552 1.067 4.882 2.624 6.701-.397-.06-.8-.099-1.21-.115l-2.729-2.729-1.414 1.414 2.729 2.729c.218 5.528 4.524 10.019 9.978 10.513zm1-29.505c-.474-1.036-1.104-1.983-1.861-2.818.477.223 1.08.374 1.861.374s1.384-.151 1.861-.373c-.757.834-1.387 1.781-1.861 2.817zm0 5.556c.561 0 1.107-.056 1.646-.137-.663.775-1.217 1.643-1.646 2.581-.429-.938-.983-1.806-1.646-2.581.539.081 1.085.137 1.646.137zm0 8c.561 0 1.107-.056 1.646-.137-.663.775-1.217 1.643-1.646 2.581-.429-.938-.983-1.806-1.646-2.581.539.081 1.085.137 1.646.137zm0 8c.561 0 1.107-.056 1.646-.137-.663.775-1.217 1.643-1.646 2.581-.429-.938-.983-1.806-1.646-2.581.539.081 1.085.137 1.646.137zm1.063 5.938c.485-4.115 3.76-7.39 7.875-7.875-.486 4.115-3.76 7.389-7.875 7.875zm0-8c.485-4.115 3.76-7.39 7.875-7.875-.486 4.115-3.76 7.389-7.875 7.875zm0-8c.485-4.115 3.76-7.39 7.875-7.875-.486 4.115-3.76 7.389-7.875 7.875zm7.875-15.875c-.485 4.115-3.76 7.39-7.875 7.875.485-4.116 3.759-7.39 7.875-7.875zm-8.938-6.971c1.154 2.331 2.112 5.18 1.46 6.331-.081.142-.327.577-1.46.577s-1.379-.435-1.46-.577c-.652-1.152.306-4 1.46-6.331zm-1.062 14.846c-4.115-.485-7.39-3.76-7.875-7.875 4.115.485 7.389 3.759 7.875 7.875zm0 8c-4.115-.485-7.39-3.76-7.875-7.875 4.115.485 7.389 3.759 7.875 7.875zm0 8c-4.115-.485-7.39-3.76-7.875-7.875 4.115.485 7.389 3.759 7.875 7.875zm0 8c-4.115-.485-7.39-3.76-7.875-7.875 4.115.485 7.389 3.759 7.875 7.875z"/>
                <path d="m58.978 14.436 2.729-2.729-1.414-1.414-2.729 2.729c-2.386.094-4.577.946-6.339 2.33 1.508-2.795-1.326-8.081-2.225-9.625v-3.727h-2v3.727c-.899 1.544-3.733 6.83-2.225 9.625-1.762-1.384-3.953-2.236-6.339-2.33l-2.729-2.729-1.414 1.414 2.729 2.729c.101 2.552 1.067 4.882 2.624 6.701-.397-.06-.8-.099-1.21-.115l-2.729-2.729-1.414 1.414 2.729 2.729c.101 2.552 1.067 4.882 2.624 6.701-.397-.06-.8-.099-1.21-.115l-2.729-2.729-1.414 1.414 2.729 2.729c.101 2.552 1.067 4.882 2.624 6.701-.397-.06-.8-.099-1.21-.115l-2.729-2.729-1.414 1.414 2.729 2.729c.218 5.528 4.524 10.019 9.978 10.513v13.051h2v-13.051c5.454-.494 9.76-4.985 9.978-10.513l2.729-2.729-1.414-1.414-2.729 2.729c-.41.016-.813.055-1.21.115 1.556-1.819 2.523-4.149 2.624-6.701l2.729-2.729-1.414-1.414-2.729 2.729c-.41.016-.813.055-1.21.115 1.556-1.819 2.523-4.149 2.624-6.701l2.729-2.729-1.414-1.414-2.729 2.729c-.41.016-.813.055-1.21.115 1.557-1.819 2.523-4.149 2.624-6.701zm-10.978 26.564c.561 0 1.107-.056 1.646-.137-.663.775-1.217 1.643-1.646 2.581-.429-.938-.983-1.806-1.646-2.581.539.081 1.085.137 1.646.137zm0-5.556c-.429-.938-.983-1.806-1.646-2.581.539.081 1.085.137 1.646.137s1.107-.056 1.646-.137c-.663.775-1.217 1.643-1.646 2.581zm0-8c-.429-.938-.983-1.806-1.646-2.581.539.081 1.085.137 1.646.137s1.107-.056 1.646-.137c-.663.775-1.217 1.643-1.646 2.581zm0-8c-.474-1.036-1.104-1.983-1.861-2.818.477.223 1.08.374 1.861.374s1.384-.151 1.861-.373c-.757.834-1.387 1.781-1.861 2.817zm8.938-4.381c-.485 4.115-3.76 7.39-7.875 7.875.485-4.116 3.759-7.39 7.875-7.875zm-8.938-6.971c1.154 2.331 2.112 5.18 1.46 6.331-.081.142-.327.577-1.46.577s-1.379-.435-1.46-.577c-.652-1.152.306-4 1.46-6.331zm-1.062 14.846c-4.115-.485-7.39-3.76-7.875-7.875 4.115.485 7.389 3.759 7.875 7.875zm0 8c-4.115-.485-7.39-3.76-7.875-7.875 4.115.485 7.389 3.759 7.875 7.875zm0 8c-4.115-.485-7.39-3.76-7.875-7.875 4.115.485 7.389 3.759 7.875 7.875zm-7.875.125c4.115.485 7.39 3.76 7.875 7.875-4.116-.486-7.39-3.76-7.875-7.875zm10 7.875c.485-4.115 3.76-7.39 7.875-7.875-.486 4.115-3.76 7.389-7.875 7.875zm0-8c.485-4.115 3.76-7.39 7.875-7.875-.486 4.115-3.76 7.389-7.875 7.875zm0-8c.485-4.115 3.76-7.39 7.875-7.875-.486 4.115-3.76 7.389-7.875 7.875z"/>
            </g>
        ),
        author: new Author('dDara', 'https://www.flaticon.com/authors/ddara', 'www.flaticon.com', 'https://www.flaticon.com/ru/')
    },
    'BucketWithLiquid': {
        viewBox: '0 0 64 64',
        image: (
            <g>
                <path d="m32 23v-2c-2.206 0-4-1.794-4-4h-2c0 3.309 2.691 6 6 6z"/>
                <path d="m61 20h-3.688c-3.522-2.854-11.641-4.061-15.429-4.482-.246-1.63-.891-3.196-1.883-4.518l-8-10.667-8 10.667c-.992 1.322-1.637 2.888-1.884 4.518-3.787.421-11.906 1.628-15.428 4.482h-3.688c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2v5c0 4.645 2.123 8.803 5.448 11.556l1.739 10.579c.559 3.399 3.463 5.865 6.908 5.865h29.811c3.444 0 6.349-2.466 6.907-5.865l1.739-10.579c3.325-2.753 5.448-6.911 5.448-11.556v-5c1.103 0 2-.897 2-2v-6c0-1.103-.897-2-2-2zm-4 3c0 .206-.088.421-.215.638-2.787-1.926-8.16-3.403-15.114-4.141.163-.629.264-1.281.301-1.951 9.761 1.105 15.028 3.594 15.028 5.454zm-3.291 22.444c-2.16 1.598-4.822 2.556-7.709 2.556h-2v-1c0-1.103-.897-2-2-2h-20c-1.103 0-2 .897-2 2v1h-2c-2.887 0-5.549-.958-7.709-2.556l-2.405-14.632c4.697 2.761 14.448 4.188 24.114 4.188s19.417-1.427 24.114-4.188zm-11.708 5.556h-20.001v-4h20zm14.999-24.775v.775c0 2.505-9.511 6-25 6s-25-3.495-25-6v-.775c4.254 3.145 14.673 4.775 25 4.775s20.746-1.63 25-4.775zm-16.05-4.79c6.382.639 11.63 1.961 14.292 3.576-3.418 2.034-11.656 3.989-23.242 3.989s-19.824-1.956-23.242-3.99c2.662-1.614 7.911-2.936 14.292-3.577 1.638 3.294 5.03 5.567 8.95 5.567s7.311-2.273 8.95-5.565zm-15.35-9.235 6.4-8.533 6.4 8.534c1.031 1.375 1.6 3.081 1.6 4.8 0 4.411-3.589 8-8 8s-8-3.589-8-8c0-1.72.568-3.425 1.6-4.801zm-3.572 5.345c.036.671.138 1.322.301 1.952-6.953.739-12.328 2.216-15.114 4.141-.127-.217-.215-.432-.215-.638 0-1.86 5.267-4.349 15.028-5.455zm-19.028 4.455h2.169c-.109.319-.169.651-.169 1v4c0 .344.062.677.175 1h-2.175zm2 13v-5h.727l2.162 13.153c-1.803-2.232-2.889-5.067-2.889-8.153zm46.84 21.811c-.4 2.427-2.475 4.189-4.935 4.189h-29.81c-2.46 0-4.535-1.762-4.935-4.189l-1.43-8.701c2.155 1.2 4.632 1.89 7.27 1.89h2v1c0 1.103.897 2 2 2h20c1.103 0 2-.897 2-2v-1h2c2.638 0 5.115-.69 7.27-1.89zm7.16-21.811c0 3.086-1.086 5.921-2.889 8.153l2.162-13.153h.727zm2-7h-2.175c.113-.323.175-.656.175-1v-4c0-.349-.06-.681-.169-1h2.169z"/>
            </g>
        ),
        author: new Author('Eucalyp', 'https://creativemarket.com/eucalyp', 'www.flaticon.com', 'https://www.flaticon.com/')
    }
}