import React from 'react';
import {Text, View} from "..";
import useColor from "../../hooks/use-color";
import {Modal} from "react-native";
import {MotiView} from "moti";
import {Image} from "rn-alpha";

type props = {
    text?:string
    title?:string
    close?:any
    loading:boolean
    opacity?:number
}

const Preloader: React.FC<props> = (props) => {
    const {text,title,loading,close, opacity} = props;
    const {colors} = useColor()
    return (
        <>
            <Modal
                transparent={true}
                visible={loading}
                onRequestClose={() => {
                    if (close){
                        close(false)
                    }
                }}
            >
                <View flex={1} color={"#1F2021A3"} fd={"flex-center"}>
                    <View height={120} position={"absolute"} fd={"col-center"}>
                        <Text size={16} color={"text"} weight={"Bold"}>{title}</Text>
                        <MotiView
                            from={{
                                scale:1
                            }}
                            animate={{
                                scale:1.5
                            }}
                            transition={{
                                type: 'timing',
                                duration: 700,
                                loop: true,
                            }}
                        >
                            <View size={35} br={6} color={"background"} fd={"flex-center"}>
                                {/*<Svg icon={icon} size={27} color={"primary"}/>*/}
                                <Image source={require("../../assets/images/icon.png")} size={35}/>
                            </View>
                        </MotiView>
                        <Text size={14} color={"text"} >{text}</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default Preloader;
