import { describe, expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DocPortalV2 from './DocPortalV2';
import { useState } from "react";

// describe('Page', () => {

//     it('renders the page', async () => {
//         const Component = () => {
//             const [name, setName] = useState({ name: 'Dr. Tracy Kumar!'});
//             return (
//                 <div>
//                     <DocPortalV2 name={name}/>
//                     <button onClick={() => setName("Dr. Nate")}>Change </button>
//                     {/* <h1>Good Morning, {user.name}!</h1> */}
//                 </div>
//             );
//         }
//         render(<Component/>);
      
//         expect(await screen.findByText(/Good Morning, Dr. Tracy Kumar!/i)).toBeVisible();
//         fireEvent.click(screen.getByText('Change'));

//         await waitFor(() => {
//             expect(screen.getByText(/Good Morning, Dr. Nate!/i)).toBeVisible();
//         });
//         // screen.debug();
//     })
//   })
  
