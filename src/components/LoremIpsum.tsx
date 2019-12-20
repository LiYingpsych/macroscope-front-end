import React from "react";
import Typography from "@material-ui/core/Typography";

interface IProps {
    iterations?: number;
}

export default function LoremIpsum(props: IProps) {
    const { iterations = 1 } = props;

    let generatedText = "";
    for (let i = 0; i < iterations; i++) {
        generatedText += `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Habitasse platea dictumst quisque sagittis. Netus et malesuada fames ac turpis. Amet facilisis magna etiam tempor orci eu. Vestibulum sed arcu non odio. A scelerisque purus semper eget duis at tellus at. Ultricies mi eget mauris pharetra et ultrices neque. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Nunc id cursus metus aliquam eleifend mi. Pretium viverra suspendisse potenti nullam ac tortor.

            Pretium aenean pharetra magna ac placerat vestibulum. Dui accumsan sit amet nulla facilisi morbi. Condimentum id venenatis a condimentum vitae. Vel eros donec ac odio tempor orci dapibus ultrices in. Fermentum et sollicitudin ac orci phasellus egestas. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Ac tortor vitae purus faucibus ornare. Suspendisse sed nisi lacus sed viverra tellus in hac. Leo duis ut diam quam nulla. In massa tempor nec feugiat nisl pretium fusce id. Arcu dictum varius duis at consectetur lorem donec. Dui sapien eget mi proin sed. Ultricies tristique nulla aliquet enim tortor at.
            
            Feugiat in ante metus dictum at tempor commodo. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Fermentum et sollicitudin ac orci. In eu mi bibendum neque egestas congue quisque egestas. Sit amet porttitor eget dolor. Nullam eget felis eget nunc lobortis mattis. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Amet risus nullam eget felis eget. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Nisl nunc mi ipsum faucibus. Proin libero nunc consequat interdum varius. Orci sagittis eu volutpat odio facilisis. Metus dictum at tempor commodo ullamcorper a lacus. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Est ultricies integer quis auctor. Sed viverra ipsum nunc aliquet bibendum enim.
            
            Cursus metus aliquam eleifend mi. Vitae justo eget magna fermentum iaculis. Dignissim cras tincidunt lobortis feugiat. A condimentum vitae sapien pellentesque habitant morbi. Quisque sagittis purus sit amet. Eu feugiat pretium nibh ipsum consequat nisl vel. Quam elementum pulvinar etiam non. At tellus at urna condimentum mattis pellentesque id nibh. Tristique senectus et netus et malesuada fames ac. At consectetur lorem donec massa sapien. Mattis enim ut tellus elementum sagittis. Ultrices eros in cursus turpis massa. Ipsum suspendisse ultrices gravida dictum. Nec dui nunc mattis enim ut.
            
            Lacus sed viverra tellus in. Dignissim sodales ut eu sem integer vitae justo. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Pharetra convallis posuere morbi leo urna molestie at elementum. Augue eget arcu dictum varius duis at. Ornare lectus sit amet est. Pulvinar mattis nunc sed blandit. Odio morbi quis commodo odio aenean sed adipiscing. Duis ut diam quam nulla porttitor massa id neque. Id venenatis a condimentum vitae sapien pellentesque habitant. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Mattis molestie a iaculis at erat pellentesque. Id eu nisl nunc mi ipsum faucibus. Ligula ullamcorper malesuada proin libero nunc. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Id aliquet lectus proin nibh. Fames ac turpis egestas maecenas pharetra convallis. Arcu vitae elementum curabitur vitae.
            `;
    }

    return <Typography>{generatedText}</Typography>;
}
