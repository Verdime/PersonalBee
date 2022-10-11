import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room{

    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        };

        this.setModel();
        this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach((child)=>{
            child.castShadow = true;
            child.receiveShadow = true;
            //console.log(child.name);
            if (child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
            
            // if (child.name === "Cube"){
            //     child.material = new THREE.MeshPhysicalMaterial();
            //     child.material.roughness = 0.8;
            //     child.material.color.set(0x6495ED);
            //     child.material.ior = 3;
            //     child.material.transmission = 1;
            //     child.material.opacity = 0.9;
            // }
            if (child.name === "Cube"){
                child.material = new THREE.MeshBasicMaterial({
                    color: 0x6495ED,
                    wireframe: false,

                });
            }
            child.material.wireframe = true;
           /*
            if(child.name === "Cube"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
                console.log("material applied");
            }
           */ 
            
        });



        // const geometry = new THREE.BoxGeometry( 1, 1, 1 );



        // this.cube = new THREE.Mesh( geometry );

        
        // this.cube.material = new THREE.MeshPhysicalMaterial();
        // this.cube.material.roughness = 0.8;
        // this.cube.material.color.set(0x6495ED);
        // this.cube.material.ior = 3;
        // this.cube.material.transmission = 1;
        // this.cube.material.opacity = 0.9;

        // this.room = this.cube;

        // this.scene.add( this.room );
        // this.room.scale.set(8,8,8);
        // this.room.position.set(6,2,8);

        // this.room.name = "cube";


        // this.room.rotation.x = 1.2;
        // this.room.rotation.y = Math.PI * 0.1;




        const width = 10;
        const height = 10;
        const intensity = 3;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set( -3,6,6);
        rectLight.lookAt( 0, 0, 0 );
        this.actualRoom.add( rectLight )

        //const rectLightHelper = new RectAreaLightHelper( rectLight );
        //rectLight.add( rectLightHelper );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(2,2,2);
        this.actualRoom.position.set(6,2,8);

        this.actualRoom.rotation.x = 1.2;
        this.actualRoom.rotation.y = Math.PI * 0.1;
    }
    

    onMouseMove()
    {
        window.addEventListener("mousemove", (e) =>
        {
            this.rotation = ((e.clientX - window.innerWidth / 2)) * 2 /window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });

    }



    resize()
    {
        
    } 

    update()
    {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease,
        );
        this.actualRoom.rotation.z = this.lerp.current;
        //this.actualRoom.rotation.x = this.lerp.current / 10;
        //this.actualRoom.rotation.y = this.lerp.current / 10;
        

    }

}