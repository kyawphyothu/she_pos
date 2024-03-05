import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Divider, Grid, Skeleton, Stack, Tab, Tabs, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { getMonthlyReport } from '../../apiCalls';

export default function InOutReport() {
	const [yearMonthTab, setYearMonthTab] = useState(0);
	const [selectedYear, setSelectedYear] = useState(new Date());
	const [acceptors, setAcceptors] = useState([
		{id: 1, name: "အိမ်", short_name: "အိမ်"},
		{id: 2, name: "အေးအေးခိုင်", short_name: "အေး"},
		{id: 3, name: "စန်းစန်းထွေး", short_name: "စန်း"},
		{id: 4, name: "ဥမ္မာဝင်း", short_name: "ဥမ္မာ"},
	]);
	const [isFetchingData, setIsFetchingData] = useState(false);
	const [monthlyReports, setMonthlyReports] = useState({});

	console.log(monthlyReports)

	const monthsArray = [
		"January", "February", "March", "April",
		"May", "June", "July", "August",
		"September", "October", "November", "December"
	];

	const handleYearMonthTab = (e, newVal) => {
		setYearMonthTab(newVal)
	}

	const handleChangeSelectedYear = (e) => {
		setSelectedYear(e.$d)
	}

	async function FetchData(){
		setIsFetchingData(true)
		const result = await getMonthlyReport(selectedYear.getFullYear());

		// console.log(result)
		setMonthlyReports(result);

		setIsFetchingData(false)
	}

	useEffect(() => {
		FetchData()
	}, [selectedYear])

	return (
		<>
			<div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
				<Tabs value={yearMonthTab} onChange={handleYearMonthTab}>
					<Tab label="Monthly" />
					{/* <Tab label="Yearly" /> */}
				</Tabs>
			</div>

			{
				yearMonthTab === 0 ? (
					<>
						<Box sx={{ mb: 2 }}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={['DatePicker', 'DatePicker']}>
									<DatePicker
										value={dayjs(selectedYear)}
										onAccept={handleChangeSelectedYear}
										label={'Year'}
										views={["year"]}
										slotProps={{
											textField: {
												size: 'small',
											}
										}}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</Box>

						{
							isFetchingData ? (
								<>
									<LoadingSkeleton />
								</>
							) : (
								<>
									{
										monthsArray.filter((i, index) => monthlyReports.hasOwnProperty(index+1)).length > 0 ? (
											monthsArray.filter((i, index) => monthlyReports.hasOwnProperty(index+1)).map((month, month_index) => {
												return (
													<Accordion defaultExpanded key={month}>
														<AccordionSummary>{month} - {selectedYear.getFullYear()}</AccordionSummary>
														<AccordionDetails sx={{ overflow: "auto" }}>
															{
																acceptors.map((acceptor, acceptor_index) => {
																	const total_in = (+monthlyReports[month_index+1]?.[acceptor.id]?.pay_interest_price || 0) + (+monthlyReports[month_index+1]?.[acceptor.id]?.redeem_price || 0) + (+monthlyReports[month_index+1]?.[acceptor.id]?.half_redeem_price || 0);
																	const total_out = (+monthlyReports[month_index+1]?.[acceptor.id]?.htet_yu_price || 0) + (+monthlyReports[month_index+1]?.[acceptor.id]?.pawn_price || 0);

																	return (
																		<>
																			<Stack direction={"row"} spacing={2}>
																				<Box sx={{ display: "flex", flexGrow: "1", textAlign: "center", alignItems: "center" }}>
																					<Typography>
																						{acceptor.short_name}
																					</Typography>
																				</Box>
																				<Stack direction={"column"}>
																					<Box color={green[500]} sx={{ display: "flex", justifyContent: "flex-end" }}>{total_in.toLocaleString()}</Box>
																					<Box color={red[500]} sx={{ display: "flex", justifyContent: "flex-end" }}>{total_out.toLocaleString()}</Box>
																				</Stack>
																			</Stack>
																			{acceptors[acceptor_index+1] && <Divider />}
																		</>
																	)
																})
															}
														</AccordionDetails>
													</Accordion>
												)
											})
										):(
											<>
												<Typography textAlign={"center"} color={'GrayText'}>Empty</Typography>
											</>
										)
									}
								</>
							)
						}

					</>
				) : (
					<></>
				)
			}
		</>
	)
}

const LoadingSkeleton = () => {
	return (
		<Card>
			<CardContent>
				<Skeleton width={"20%"} />
				{
					[1,2,3,4].map(i => {
						return (
							<>
								<Grid container width={"100%"}>
									<Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
										<Skeleton width={"20%"} />
									</Grid>
									<Grid item xs={6}>
										<Stack direction={"column"} >
											<Box color={green[500]} justifyContent={"flex-end"} display={"flex"}><Skeleton width="50%" /></Box>
											<Box color={green[500]} justifyContent={"flex-end"} display={"flex"}><Skeleton width="50%" /></Box>
										</Stack>
									</Grid>
								</Grid>
								{i!==4 && <Divider />}
							</>
						)
					})
				}
			</CardContent>
		</Card>
	)
}