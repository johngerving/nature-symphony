<script lang="ts">
    import * as Card from "$lib/components/ui/card";
  </script>




<!-- stored bird stuff tried em, tried px,  width="400em" height="400em"-->
<div class="birddiv"> 
    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Peacock_Plumage.jpg" class="birdimg">
    <div><h1> bird name </h1>
    <p> placeholder for information about bird <br>
    what they eat <br>
    information about location
    </p>
</div>
</div>
    <!--soundbytes in this block-->
<div> </div>
    <!-- iNat obs site -->
<div class="birddiv">
    <div class="margins">
    <h1> iNatural Site </h1>
    <p> placeholder for the link to the iNatural site</p>
</div>
<div class="margins">
    <h1> Location </h1>
    <p> placeholder for location</p>
</div>
<div class="margins">
    <h1> Digital Commons</h1>
    <p>research placeholder</p>
</div>
</div>
<style>
    .birddiv {
    display:flex;
    flex-direction: row;
}
.margins {
    width: 300px;
  margin: auto;
  border: 1px solid rgb(190, 236, 160);
}
    .birdimg {
        width: 300px;
        height: 300px;
        display: inline; 
    }
  </style> 
