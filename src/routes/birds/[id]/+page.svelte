<script lang="ts">
    import * as Card from "$lib/components/ui/card";
  </script>




<!-- stored bird stuff -->
<div> 
    	<!--image goes here  -->
<div>
    <h1> bird name </h1>
    <p> placeholder for information about bird <br>
    what they eat <br>
    information about location
    </p>
</div>
</div>
    <!--soundbytes in this block-->
<div>
    <!-- iNat obs site -->
    <Card.Root class = "style">
    <Card.Header>
    <Card.Title>Link to the iNatural site</Card.Title>
    <Card.Description>Card Description</Card.Description>
    </Card.Header>
    <Card.Content>
    <p>Card Content</p>
    </Card.Content>
    <Card.Footer>
    <p>Card Footer</p>
    </Card.Footer>
    </Card.Root>   
</div>

<div>
    <!-- Map location -->
    <Card.Root class = "style">
    <Card.Header>
    <Card.Title>Location</Card.Title>
    <Card.Description>Card Description</Card.Description>
    </Card.Header>
    <Card.Content>
    <p>Card Content</p>
    </Card.Content>
    <Card.Footer>
    <p>Card Footer</p>
    </Card.Footer>
    </Card.Root>   
</div>

<div>
    <!-- research -->
    <Card.Root class = "style">
    <Card.Header>
    <Card.Title>Digital Commons</Card.Title>
    <Card.Description>Card Description</Card.Description>
    </Card.Header>
    <Card.Content>
    <p>Card Content</p>
    </Card.Content>
    <Card.Footer>
    <p>Card Footer</p>
    </Card.Footer>
    </Card.Root>   
</div>

<div class="style">
    
</div>

<style>
    .style {
      width: 300px;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      
      /* Grid layout for fixed image size */
      display: grid;
      grid-template-rows: auto 350px;
    }
  
    header {
      padding: 1.5rem;
      background: white;
      z-index: 1;
    }
  
    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
  
    p {
      margin: 0.5rem 0 0 0;
      font-size: 1rem;
      font-style: italic;
      color: #666;
    }
  
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  </style> 
